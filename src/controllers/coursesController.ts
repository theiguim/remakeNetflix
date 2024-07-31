import { Request, Response } from "express"
import { courseService } from "../services/courseServices"
import { getPaginetionParams } from "../helpers/getPaginationParams"
import { AuthenticatedRequest } from "../middlewares/auth"
import { likeService } from "../services/likeService"
import { favoriteService } from "../services/favoriteService"

export const coursesController = {

    //GET /courses/featured

    featured: async (req: Request, res: Response) => {

        try {

            const featuredCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        } catch (err) {

            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }

        }
    },

    //GET /courses/newest

    newest: async (req: Request, res: Response) => {

        try {
            const newestCourses = await courseService.getTopTenNewset()
            res.json((newestCourses))
        } catch (err) {

            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }

        }
    },

         // GET /courses/popular
    popular: async (req: Request, res: Response) => {
        try {
          const topTen = await courseService.getTopTenByLikes()
          return res.json(topTen)
        } catch (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
          }
        }
      },

    //GET  /courses/seatch?name
    search: async (req: Request, res: Response) => {

        const { name } = req.query
        const [page, perPage] = getPaginetionParams(req.query)
        try {
            if (typeof name !== "string") throw new Error("name param must be of type string")
            const courses = await courseService.findByName(name, page, perPage)
            return res.json(courses)
        } catch (err) {

            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },


    //GET /course/:id

    show: async (req: AuthenticatedRequest, res: Response) => {

        const userId = req.user!.id
        const courseId = req.params.id

        try {
            const course = await courseService.findByIdWithEpisodes(courseId)

            if (!course) return res.status(404).json({ message: "curso não encontrado" })

            const liked = await likeService.isLiked(userId, Number(courseId))

            const favorited = await favoriteService.isFavorited(userId, Number(courseId))

            return res.json({ ...course.get(), liked })
        } catch (err) {

            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }

        }
    }


}