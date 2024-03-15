package be.arbiter.clouddragonsheet.configuration.security;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class AppBeans {

    ModelMapper _modelMapper =  null;
    @Bean
    public ModelMapper modelMapper(){
        if(_modelMapper == null){
            //Instantiation and initialization
            _modelMapper = new ModelMapper();
        }
        return _modelMapper;
    }
}
