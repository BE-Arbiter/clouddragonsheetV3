package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.configuration.security.jwt.JwtUtils;
import be.arbiter.clouddragonsheet.data.dtos.SheetDto;
import be.arbiter.clouddragonsheet.data.dtos.SimpleAnswerDTO;
import be.arbiter.clouddragonsheet.data.dtos.UserAdminDto;
import be.arbiter.clouddragonsheet.data.dtos.UserDto;
import be.arbiter.clouddragonsheet.data.entities.User;
import be.arbiter.clouddragonsheet.services.SheetService;
import be.arbiter.clouddragonsheet.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api/public/sheets")
public class PublicSheetController {
    @Autowired
    private SheetService sheetService;

    @GetMapping("/byToken/{token}")
    public ResponseEntity<SheetDto> getSheetByToken(@PathVariable String token){
        return ResponseEntity.ok(sheetService.getByToken(token));
    }


}
