package be.arbiter.clouddragonsheet.data.entities;

import jakarta.persistence.*;
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
    @Column(name="character_name",nullable = false)
    private String characterName;
    private String game;
    private String data;

    private Boolean archived;
}
