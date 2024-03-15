package be.arbiter.clouddragonsheet.data.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@MappedSuperclass
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class AuditableEntity extends BaseEntity {
    @Column(name = "cr_user")
    private String crUser;
    @Column(name = "cr_date")
    private Calendar crDate;
    @Column(name = "up_user")
    private String upUser;
    @Column(name = "up_date")
    private Calendar upDate;
}
