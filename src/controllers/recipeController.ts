import { Request, Response } from "express";
import Recipe from "../models/Recipe";
 
export const recipeController = {
    // Criar uma nova receita
    async create(req: Request, res: Response): Promise<any> {
        if (req.body.title && req.body.title.length > 3) {        
            if (req.body.ingredients.length>0){

            try {
            const recipe = await Recipe.create(req.body);
            return res.status(201).json(recipe);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao criar receita" });
        }
    }else {
        return res.status(400).json({ error: "Erro ao criar receita: ela precisa conter os ingredientes." });
    }
    }else {
        return res.status(400).json({ error: "Erro ao criar receita: título precisa ter mais de 3 carcteres." });    }
    },
 
   

  // Listar todas as receitas com paginação
  async list(req: Request, res: Response): Promise<any> {
    try {
      // Parâmetros de paginação
      const page = parseInt(req.query.page as string) || 1;  // Página atual (default é 1)
      const limit = parseInt(req.query.limit as string) || 3;  // Limite de itens por página (default é 10)

      // Calcular o número de itens a pular (skip)
      const skip = (page - 1) * limit;

      // Encontrar as receitas com base na paginação
      const recipes = await Recipe.find().skip(skip).limit(limit);

      // Contar o total de receitas no banco de dados
      const totalRecipes = await Recipe.countDocuments();

      // Retornar as receitas e informações de paginação
      return res.json({
        currentPage: page,
        totalPages: Math.ceil(totalRecipes / limit),  // Total de páginas
        totalRecipes,
        recipes,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar receitas' });
    }
  },

 
    // Buscar uma receita específica
    async getById(req: Request, res: Response): Promise<any> {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).json({ error: "Receita não encontrada" });
            }
            return res.json(recipe);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar receita" });
        }
    },

     // Editar uma receita específica
     async update(req: Request, res: Response): Promise<any> {
        try {
            const recipe = await Recipe.findByIdAndUpdate(
              req.params.id,
              req.body,
              { new: true }
            );
            if (!recipe) return res.status(404).json({ message: 'Receita não encontrada!' });
            res.json(recipe);
          } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar receita" });
          }
    },

     // Deletar receita
async delete(req: Request, res: Response): Promise<any> {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      
      if (!recipe) {
        return res.status(404).json({ message: 'Receita não encontrada!' });
      }
      
      // Mensagem de sucesso após a exclusão
      return res.status(200).json({ message: 'Receita deletada com sucesso!'});
      
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar receita" });
    }
  },

 // Buscar receitas por título com flexibilidade
async getByTitle(req: Request, res: Response): Promise<any> {
    console.log('Buscando receitas com o título:', req.params.title);
  
    const title = req.params.title.replace(/[-_]/g, ' ');  // Substitui hífens ou sublinhados por espaços
  
    try {
      const recipes = await Recipe.find({ title: new RegExp(`^${title}$`, 'i') }); // Pesquisa mais flexível e sem diferenciar maiúsculas/minúsculas
  
      if (recipes.length === 0) {
        return res.status(404).json({ error: "Nenhuma receita encontrada com esse título." });
      }
  
      return res.json(recipes);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar receitas" });
    }
  },

// Buscar receitas por nível de dificuldade
async getByDifficulty(req: Request, res: Response): Promise<any> {
    try {
      // Pega o parâmetro 'difficulty' da URL
      const { difficulty } = req.params;
      
      // Realiza a busca no banco de dados, com uma expressão regular para facilitar a busca
      const recipes = await Recipe.find({ difficulty: new RegExp(`^${difficulty}$`, 'i') });
  
      // Verifica se encontrou receitas
      if (recipes.length === 0) {
        return res.status(404).json({ error: "Nenhuma receita encontrada para este nível de dificuldade." });
      }
  
      // Retorna as receitas encontradas
      return res.json(recipes);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar receitas" });
    }
  }
  
  
  
  
  
  
    
};
 
 