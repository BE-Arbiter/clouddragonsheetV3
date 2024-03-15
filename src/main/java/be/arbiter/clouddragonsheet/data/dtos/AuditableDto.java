package be.arbiter.clouddragonsheet.data.dtos;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Calendar;

@Data
@EqualsAndHashCode(callSuper = true)
public class AuditableDto extends BaseDto {
    private String crUser;
    private Calendar crDate;
    private String upUser;
    private Calendar upDate;

}
