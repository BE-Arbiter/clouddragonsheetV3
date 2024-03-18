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
@Table(name = "sheets_public_access")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class SheetPublicAccess extends BaseEntity{
    private String token;

    @ManyToOne
    @JoinColumn(name="sheet", nullable=false)
    private Sheet sheet;

}
