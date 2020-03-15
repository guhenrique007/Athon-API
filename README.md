# Athon-API

- Run with `npm start`
- Requests:
  - Trazer todas as armas (nome e tipo) do sistema que já foram utilizadas em algum
crime.  `http://localhost:3000/police/weapons`
  - Trazer todas as informações a cerca de um determinado crime (vítimas, armas,
criminosos, país e data).  `http://localhost:3000/police/crime/:id`
  - Inserir um novo crime com todas as suas informações agregadas(armas, vitimas,
criminosos);  `http://localhost:3000/police/crime`


    body example: 
    
    ```
    {
      "country": "Brasil",
      "date": "2002-09-26 00:00:00",
      "weapons":[
        {"weapon_name": "faquinha",
        "weapon_type_id": "2"},
        {"weapon_name": "amor",
        "weapon_type_id": "1"}
      ],
      "criminals":[
        {"criminal_name": "Itachi"},
        {"criminal_name": "Doflamingo"}
      ],
      "crime_type_id": "1",
      "victims":[
        {"victim_name": "Nami"},
        {"victim_name": "Usopp"}
      ]
    }
    ```
    
    
  - Deletar um crime por: data ou país.  
    `http://localhost:3000/police/crime/:country`  and  
    `http://localhost:3000/police/crime/:date`
  
  body example:
   ```
   {
      "country": "Brasil3",
      "date": "2002-09-27 00:00:00"
   }
   ```
  
  
  - Listar crimes por: Range de data, armas ou criminosos  `http://localhost:3000/police/crime/criminal/:criminal_name`,
    `http://localhost:3000/police/crime/weapon/:weapon_name`,
    `http://localhost:3000/police/crime/date/:date1/:date2`
  
  
  
