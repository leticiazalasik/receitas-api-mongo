import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import { promises } from "dns";
 
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
 
    // Listar todas as receitas
    async list(req: Request, res: Response): Promise<any> {
        try {
            const recipes = await Recipe.find();
            return res.json(recipes);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao listar receitas" });
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

     // Buscar uma receita específica
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
};
 
 