const { v4 } = require('uuid');
const express = require('express');
const { json } = require('express');
const app = express();

app.use(express.json());

const biblioteca = [];

app.get('/biblioteca' , (request, response) => {
        return response.json(biblioteca);
});

app.post('/biblioteca' , (request, response) => {
        const { type, description} = request.body;
        const livro = {
                id: v4(),
                type: type,
                description: description,
        };
        biblioteca.push(livro);
        return response.json(livro);
        });

app.put('/biblioteca/:id' , (request, response) => {
        const { id } = request.params;
        const {type, description } = request.body;
        const index = biblioteca.findIndex(p => p.id === id);

        if (index < 0 ) {
                return response.json({error: 'livro não encontrado' })
        }

        const item = {
                id: id,
                type: type,
                description: description,               
        }
        biblioteca[index] = item;
        return response.json(item);
       });

app.delete('/biblioteca/:id' , (request, response) => {
        const { id } =  request.params;
                                
        const index = biblioteca.findIndex(p => p.id === id);
        if (index < 0) {
                return response.json({ erro: 'livro não encontrado'})
        }
        
        biblioteca.splice(index, 1);
        return response.json({ message: `O livro ${id} foi removido com sucesso!`});
});

app.listen(3333);
