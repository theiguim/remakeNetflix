import { Course } from "../models/Course"

export const courseService = {
    findByIdWithEpisodes: async (id: string) =>{
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id',
                'name',
                "synopsis",
                ["thumbnail_url", "thumbnailUrl"]
            ],
            include: {
                association: "episodes",
                attributes: [
                    "id",
                    "name",
                    "synopsis",
                    "order",
                    ["video_url", "videoUrl"],
                    ["seconds_long", "secondsLong"]
                ],
                order: [["order", "ASC"]],
                separate: true
            }
        })
        return courseWithEpisodes
    },

    getRandomFeaturedCourses: async ()=>{
        const featuredCourses = await Course.findAll({
            attributes: [
                'id',
                'name',
                "synopsis",
                ["thumbnail_url", "thumbnailUrl"]
            ],

            where: {
                featured: true
            }

        })
        const randomFeturedCourses = featuredCourses.sort(() => 0.5 - Math.random());
        return randomFeturedCourses.slice(0,3)
    }
}