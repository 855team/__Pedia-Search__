package com.example.backend;

import com.example.backend.Entity.Entry;
import com.example.backend.Service.EntityService;
import com.example.backend.Service.EntryService;
import org.bson.BasicBSONObject;
import org.bson.types.BasicBSONList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@WebAppConfiguration
public class ControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @MockBean
    private EntityService entityService;

    @MockBean
    private EntryService entryService;

    @BeforeEach()
    public void setup() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void Neo4jTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.get("/neo4j")
                .param("keyword","上海")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);
        Map<String,Object> map = new HashMap<>(),l1 = new HashMap<>(),l2 = new HashMap<>();
        map.put("title","北京");

        List<Map<String,Object>> mapList = new LinkedList<>();

        l1.put("weight",3.44);l1.put("title","故宫");
        mapList.add(l1);

        l2.put("weight",4.55);l2.put("title","烤鸭");
        mapList.add(l2);

        map.put("linked_word",mapList);


        when(entityService.findByKeyword(anyString())).thenReturn(map);
        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    @Test
    public void MongodbTest() throws Exception{
        RequestBuilder req = MockMvcRequestBuilders.get("/mongodb")
                .param("keyword","上海")
                .accept(MediaType.ALL)
                .contentType(MediaType.ALL);

        BasicBSONObject bsonObject = new BasicBSONObject();
        bsonObject.append("title","文化");
        bsonObject.append("text","balabala");

        BasicBSONList sections = new BasicBSONList();
        bsonObject.append("sections",sections);

        Entry entry = new Entry("上海",1123,bsonObject);

        when(entryService.findByTitle(anyString())).thenReturn(entry);

        MvcResult result = mockMvc.perform(req)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }
}
