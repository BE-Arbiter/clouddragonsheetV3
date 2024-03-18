package be.arbiter.clouddragonsheet.data.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShareDto {
    private Integer sheetId;
    private String email;
    private Integer userId;
}
