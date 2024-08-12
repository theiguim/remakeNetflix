// src/models/index.ts

import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { Favorite } from './Favorite'
import { User } from './User'
import { Like } from './Like'
import { WatchTime } from './WatchTime'

Category.hasMany(Course)
Category.hasMany(Course, { foreignKey: 'categoryId', as: 'courses' }); 




Course.belongsTo(Category)
// Course.hasMany(Episode)
Course.hasMany(Episode, { foreignKey: 'courseId', as: 'episodes' }); //adc depois
Course.belongsToMany(User, { through: Favorite })
Course.belongsToMany(User, { through: Like })


Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' })
Course.belongsTo(Category, { foreignKey: 'categoryId' });

// Episode.belongsTo(Course)
Episode.belongsTo(Course, { foreignKey: 'courseId' }); //adc depois
Episode.belongsToMany(User, { through: WatchTime })


Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, { through: Favorite })
User.belongsToMany(Course, { through: Like })
User.belongsToMany(Episode, { through: WatchTime })
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'user_id' })

export {
  Category,
  Course,
  Episode,
	Favorite,
  Like,
  User,
  WatchTime
}