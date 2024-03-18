package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.configuration.security.jwt.JwtUtils;
import be.arbiter.clouddragonsheet.data.dtos.ShareDto;
import be.arbiter.clouddragonsheet.data.dtos.SheetDto;
import be.arbiter.clouddragonsheet.data.dtos.SimpleAnswerDTO;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.repositories.UserRepository;
import be.arbiter.clouddragonsheet.services.SheetService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sheets")
public class SheetController {
    @Autowired
    private SheetService sheetService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/all")
    public ResponseEntity<?> getAll(HttpServletRequest request){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("errors.user.notFound");
        }
        return ResponseEntity.ok(sheetService.findAllForUser(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(HttpServletRequest request,@PathVariable Integer id){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("errors.user.notFound");
        }
        return ResponseEntity.ok(sheetService.getById(id,user.getId()));
    }

    @PostMapping("/share")
    public ResponseEntity<?> share(HttpServletRequest request,@RequestBody ShareDto shareDto ){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("errors.user.notFound");
        }
        if(shareDto.getSheetId() == null || shareDto.getSheetId() == 0){
            return ResponseEntity.badRequest().body(new SimpleAnswerDTO("errors.sheets.nobodyToShareTo"));
        }
        //Cas 1 -> UserId
        if(shareDto.getUserId() != null && shareDto.getUserId() > 0){
            User toShareTo = userRepository.findById(shareDto.getUserId()).orElse(null);
            if(toShareTo == null){
                return ResponseEntity.badRequest().body("errors.user.notFound");
            }
            sheetService.shareSheetToUser(shareDto.getSheetId(),toShareTo);
            return ResponseEntity.ok(new SimpleAnswerDTO("Ok"));
        }
        //Cas 2 -> Email connu
        if(StringUtils.hasLength(shareDto.getEmail())){
            User toShareTo = userRepository.findByEmail(shareDto.getEmail()).orElse(null);
            if(toShareTo != null){
                sheetService.shareSheetToUser(shareDto.getSheetId(),toShareTo);
                return ResponseEntity.ok(new SimpleAnswerDTO("Ok"));
            }
            sheetService.shareSheetToEmail(shareDto.getSheetId(),shareDto.getEmail());
        }
        return ResponseEntity.badRequest().body(new SimpleAnswerDTO("errors.sheets.nobodyToShareTo"));
    }

    @PostMapping("")
    public ResponseEntity<?> create(HttpServletRequest request,@RequestBody SheetDto toCreate){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        return ResponseEntity.ok(sheetService.createSheet(toCreate,username));
    }
    @PutMapping("")
    public ResponseEntity<?> update(HttpServletRequest request,@RequestBody SheetDto toUpdate){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("errors.user.notFound");
        }
        if(!sheetService.userCanWriteSheet(user.getId(),toUpdate.getId())){
            return ResponseEntity.badRequest().body("errors.sheet.readOnly");
        }
        return ResponseEntity.ok(sheetService.createSheet(toUpdate,username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(HttpServletRequest request, @PathVariable Integer id){

        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("errors.user.notFound");
        }
        if(!sheetService.userCanWriteSheet(user.getId(),id)){
            return ResponseEntity.badRequest().body("errors.sheet.readOnly");
        }
        sheetService.delete(id);
        return ResponseEntity.ok(new SimpleAnswerDTO("sheet.deleted"));
    }

}
