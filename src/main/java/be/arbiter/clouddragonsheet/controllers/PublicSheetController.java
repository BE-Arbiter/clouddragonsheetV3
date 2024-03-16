package be.arbiter.clouddragonsheet.controllers;

import be.arbiter.clouddragonsheet.data.dtos.SheetDto;
import be.arbiter.clouddragonsheet.services.SheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
