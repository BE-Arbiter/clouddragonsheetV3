package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.configuration.security.jwt.JwtUtils;
import be.arbiter.clouddragonsheet.data.dtos.SheetDto;
import be.arbiter.clouddragonsheet.data.dtos.SimpleAnswerDTO;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.repositories.UserRepository;
import be.arbiter.clouddragonsheet.services.SheetService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("")
    public ResponseEntity<?> create(HttpServletRequest request, SheetDto toCreate){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        return ResponseEntity.ok(sheetService.createSheet(toCreate,username));
    }
    @PutMapping("")
    public ResponseEntity<?> update(HttpServletRequest request, SheetDto toUpdate){
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
