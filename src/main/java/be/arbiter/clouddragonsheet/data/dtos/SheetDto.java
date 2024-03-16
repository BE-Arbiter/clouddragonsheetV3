package be.arbiter.clouddragonsheet.data.dtos;

import be.arbiter.clouddragonsheet.data.entities.AuditableEntity;
import be.arbiter.clouddragonsheet.data.entities.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
public class SheetDto extends AuditableDto {
    private Integer id;
    private Integer ownerId;
    private String game;
    private String data;
    private Boolean readonly;
}
