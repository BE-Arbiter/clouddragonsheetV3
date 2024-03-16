package be.arbiter.clouddragonsheet.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

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
