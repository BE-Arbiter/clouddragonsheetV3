package be.arbiter.clouddragonsheet.services;

import be.arbiter.clouddragonsheet.data.dtos.SheetDto;
import be.arbiter.clouddragonsheet.data.entities.Sheet;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.repositories.SheetAccessRepository;
import be.arbiter.clouddragonsheet.repositories.SheetPublicAccessRepository;
import be.arbiter.clouddragonsheet.repositories.SheetRepository;
import be.arbiter.clouddragonsheet.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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

    public List<SheetDto> findAllForUser(Integer userId){
        List<SheetDto> toReturn = new ArrayList<>();
        //Récupérer toutes les fiches pour lequels je suis owwner
        toReturn.addAll(sheetRepository.findAllByOwnerId(userId).stream().map(sheet -> {
            SheetDto sheetDto = mapper.map(sheet,SheetDto.class);
            sheetDto.setReadonly(false);
            return sheetDto;
        }).toList());
        //Récupérer toutes les fiches pour les quelles j'ai accès
        toReturn.addAll(sheetAccessRepository.findAllByUserId(userId).stream().map(sheetAccess -> {
            SheetDto sheetDto = mapper.map(sheetAccess.getSheet(),SheetDto.class);
            sheetDto.setReadonly(sheetAccess.getReadonly());
            return sheetDto;
        }).toList());
        return toReturn;
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
        sheet.setCrDate(Calendar.getInstance());
        sheet.setCrUser(userLogin);
        sheet = sheetRepository.save(sheet);
        SheetDto sheetDto = mapper.map(sheet,SheetDto.class);
        sheetDto.setReadonly(false);
        return sheetDto;
    }

    public SheetDto updateSheet(SheetDto toSave,String userLogin) {
        Sheet sheet = sheetRepository.findById(toSave.getId()).orElseThrow(InvalidParameterException::new);
        sheet.setData(toSave.getData());
        sheet.setUpDate(Calendar.getInstance());
        sheet.setUpUser(userLogin);
        sheet = sheetRepository.save(sheet);
        SheetDto sheetDto = mapper.map(sheet,SheetDto.class);
        sheetDto.setReadonly(false);
        return sheetDto;
    }
}
