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
@Table(name = "users_contacts")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class UserContact extends AuditableEntity{
    @ManyToOne
    @JoinColumn(name="user1", nullable=false)
    User user1;
    @ManyToOne
    @JoinColumn(name="user2", nullable=false)
    User user2;
    @Column(name = "user2_confirmed")
    Boolean user2Confirmed;

}
