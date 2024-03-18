package be.arbiter.clouddragonsheet.data.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SheetListDto extends AuditableDto {
    private Integer ownerId;
    private String characterName;
    private String game;
    private Boolean readonly;
}
