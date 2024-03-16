package be.arbiter.clouddragonsheet.data.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sheets_access")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class SheetAccess extends BaseEntity{
    @ManyToOne
    @JoinColumn(name="user", nullable=false)
    private User user;


    @ManyToOne
    @JoinColumn(name="sheet", nullable=false)
    private Sheet sheet;

    private Boolean readonly;
}
