import { db } from "./db";
import type { Request, Response } from "express";

export class CrudService {
  static async insertData(req: Request, res: Response) {
    try {
      const { name, price } = req.body;

      if (!name || price === undefined) {
        return res.status(400).json({
          message: "Incomplete details sent",
        });
      }

      const result = await db.query(
        `
        INSERT INTO products (name, price)
        VALUES ($1, $2)
        RETURNING *
        `,
        [name, price]
      );

      return res.status(201).json({
        message: "Successfully entered the product details",
        data: result.rows[0],
      });
    } catch (e) {
      console.error("Insert failed", e);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  
  static async getData(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await db.query(
        `
        SELECT * FROM products
        WHERE id = $1
        `,
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        data: result.rows[0],
      });
    } catch (e) {
      console.error("Fetch failed", e);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  
  static async updateData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      if (!name || price === undefined) {
        return res.status(400).json({
          message: "Incomplete details sent",
        });
      }

      const result = await db.query(
        `
        UPDATE products
        SET name = $1, price = $2
        WHERE id = $3
        RETURNING *
        `,
        [name, price, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Updated successfully",
        data: result.rows[0],
      });
    } catch (e) {
      console.error("Update failed", e);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }


  static async deleteData(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await db.query(
        `
        DELETE FROM products
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (e) {
      console.error("Delete failed", e);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
