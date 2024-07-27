import { Course } from "../models/Course"

export const courseService = {
    findByIdWithEpisodes: async (id: string) =>{
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id',
                'name',
                ["thumbnail_url", "thumbnailUrl"]
            ],
            include: {
                association: "Episodes",
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
    }
}