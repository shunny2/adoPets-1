import { db } from "./SQLite";

// Cria a tabela de animais
export function animais() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " + "Animais " + "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade TEXT, pelagem TEXT, porte TEXT);");
    })
}

// Faz o cadastro dos animais
export async function adicionarAnimais(animais) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO Animais (nome, idade, pelagem, porte) VALUES (?,?,?,?)",
                [animais.nome, animais.idade, animais.pelagem, animais.porte], (err, resultado) => {
                    if (resultado.rowsAffected > 0)
                        resolve("Animal adicionado com sucesso!");
                })
        })
    })
}

// Busca todos os animais
export async function buscaAnimais() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Animais", [], (transaction, resultado) => {
                var animais = [];
                for (let i = 0; i < resultado.rows.length; ++i)
                    animais.push(resultado.rows.item(i));

                if (animais.length > 0)
                    resolve(animais)
                else
                    resolve("Não há nenhum animal cadastrado.")
            })
        })
    })
}

// Busca um animal
export async function buscaAnimal(nome) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Animais where nome LIKE ?", [`${nome}`], (transaction, resultado) => {
                var tamanho = resultado.rows.length;
                if (tamanho > 0)
                    resolve(resultado.rows.item(0));
            })
        })
    })
}