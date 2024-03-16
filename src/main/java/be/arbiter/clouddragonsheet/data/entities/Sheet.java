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
@Table(name = "sheets")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class Sheet extends AuditableEntity{
    @ManyToOne
    @JoinColumn(name="owner", nullable=false)
    private User owner;
    private String game;
    private String data;
}
