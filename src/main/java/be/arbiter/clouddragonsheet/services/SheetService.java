package be.arbiter.clouddragonsheet.services;

import be.arbiter.clouddragonsheet.data.dtos.ShareDto;
import be.arbiter.clouddragonsheet.data.dtos.SheetDto;
import be.arbiter.clouddragonsheet.data.dtos.SheetListDto;
import be.arbiter.clouddragonsheet.data.entities.Sheet;
import be.arbiter.clouddragonsheet.data.entities.SheetAccess;
import be.arbiter.clouddragonsheet.data.entities.SheetPublicAccess;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.repositories.SheetAccessRepository;
import be.arbiter.clouddragonsheet.repositories.SheetPublicAccessRepository;
import be.arbiter.clouddragonsheet.repositories.SheetRepository;
import be.arbiter.clouddragonsheet.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class SheetService {

    @Autowired
    SheetRepository sheetRepository;

    @Autowired
    SheetAccessRepository sheetAccessRepository;

    @Autowired
    SheetPublicAccessRepository sheetPublicAccessRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper mapper;

    public List<SheetListDto> findAllForUser(Integer userId){
        List<SheetListDto> toReturn = new ArrayList<>();
        //Récupérer toutes les fiches pour lequels je suis owwner
        toReturn.addAll(sheetRepository.findAllByOwnerId(userId).stream().map(sheet -> {
            SheetListDto sheetDto = mapper.map(sheet,SheetListDto.class);
            sheetDto.setReadonly(false);
            return sheetDto;
        }).toList());
        //Récupérer toutes les fiches pour les quelles j'ai accès
        toReturn.addAll(sheetAccessRepository.findAllByUserId(userId).stream().map(sheetAccess -> {
            SheetListDto sheetDto = mapper.map(sheetAccess.getSheet(),SheetListDto.class);
            sheetDto.setReadonly(sheetAccess.getReadonly());
            return sheetDto;
        }).toList());
        return toReturn;
    }
    public SheetDto getById(Integer id,Integer userId){
        Sheet sheet = sheetRepository.findById(id).orElseThrow(InvalidParameterException::new);
        SheetDto sheetDto = mapper.map(sheet,SheetDto.class);
        if(sheet.getOwner().getId().equals(userId)
        || sheetAccessRepository.existsByUserIdAndSheetIdAndReadonly(userId,sheet.getId(),false)){
            sheetDto.setReadonly(false);
            return sheetDto;
        }
        if(sheetAccessRepository.existsByUserIdAndSheetIdAndReadonly(userId,sheet.getId(),true)){
            sheetDto.setReadonly(true);
            return sheetDto;
        }
        throw new AccessDeniedException("errors.sheet.noAccess");
    }

    public SheetDto getByToken(String token){
        SheetDto sheetDto = mapper.map(sheetPublicAccessRepository.getSheetPublicAccessByToken(token).getSheet(),SheetDto.class);
        sheetDto.setReadonly(true);
        return sheetDto;
    }

    public Boolean userCanDeleteSheet(Integer userId, Integer sheetId){
        return sheetRepository.existsByOwnerIdAndId(userId,sheetId);
    }

    public Boolean userCanWriteSheet(Integer userId, Integer sheetId){
        return sheetRepository.existsByOwnerIdAndId(userId,sheetId) &&
                sheetAccessRepository.existsByUserIdAndSheetIdAndReadonly(userId,sheetId,false);
    }

    public void delete(Integer sheetId){
        sheetRepository.deleteById(sheetId);
    }
    public SheetDto createSheet(SheetDto toSave,String userLogin) {
        User user = userRepository.findByUsername(userLogin).orElseThrow(InvalidParameterException::new);
        Sheet sheet = mapper.map(toSave,Sheet.class);
        sheet.setOwner(user);
        sheet.setArchived(false);
        sheet.setCrUser(userLogin);
        sheet = sheetRepository.save(sheet);
        SheetDto sheetDto = mapper.map(sheet,SheetDto.class);
        sheetDto.setReadonly(false);
        return sheetDto;
    }

    public SheetDto updateSheet(SheetDto toSave,String userLogin) {
        Sheet sheet = sheetRepository.findById(toSave.getId()).orElseThrow(InvalidParameterException::new);
        sheet.setData(toSave.getData());
        sheet.setUpUser(userLogin);
        sheet = sheetRepository.save(sheet);
        SheetDto sheetDto = mapper.map(sheet,SheetDto.class);
        sheetDto.setReadonly(false);
        return sheetDto;
    }

    public void shareSheetToUser(Integer sheetId,User user){
        shareSheetToUser(sheetId,user,true);
    }
    public void shareSheetToUser(Integer sheetId, User user,Boolean readonly) {
        Sheet sheet = sheetRepository.findById(sheetId).orElseThrow(InvalidParameterException::new);
        SheetAccess access = new SheetAccess();
        access.setReadonly(readonly);
        access.setSheet(sheet);
        access.setUser(user);
        sheetAccessRepository.save(access);
    }

    public void revokeSharing(Integer sheetAccessId){
        sheetAccessRepository.deleteById(sheetAccessId);
    }

    public void generateSheetToken(ShareDto shareDto) {
        Sheet sheet = sheetRepository.findById(shareDto.getSheetId()).orElseThrow(InvalidParameterException::new);
        SheetPublicAccess access = new SheetPublicAccess();
        String token = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes());

        access.setComment(shareDto.getComment());
        access.setEmail(shareDto.getEmail());
        access.setToken(token);
        access.setSheet(sheet);
        sheetPublicAccessRepository.save(access);
    }

    public void revokeSheetToken(Integer publicSheetAccessId){
        sheetPublicAccessRepository.deleteById(publicSheetAccessId);
    }
}
