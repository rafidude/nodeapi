# Node.js API Sample Template

//INSERT
curl -i -X POST -H "Content-Type:application/json" http://localhost:3030/contacts -d '{"firstName":"Rafi", "age": 25}'
curl -i -X POST -H "Content-Type:application/json" http://localhost:3030/contacts -d '{"firstName":"Waheeda", "age": 21}'
curl -i -X POST -H "Content-Type:application/json" http://localhost:3030/contacts -d '{"firstName":"TT", "age": 20}'
//GET ALL
curl http://localhost:3030/contacts
//GET ONE
curl http://localhost:3030/contacts/58701391913bbd3092219a99
//DELETE
curl -i -X DELETE http://localhost:3030/contacts/5870140f913bbd3092219a9a
//UPDATE
curl -i -X PUT -H "Content-Type:application/json" http://localhost:3030/contacts/587012ef230832302f21e40c -d '{"firstName":"Rafi1", "age": 26}'