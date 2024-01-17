import { postCollection, sessionCollection, userCollection } from '../db/db';
import { BlogModel } from '../models/blog.model';
import { CommentModel } from '../models/comment.model';
import { videoDb } from '../routers/videos.router';

export class TestingRepository {
  static async clearAllData(): Promise<boolean> {
    try {
      videoDb.videos = [];

      await BlogModel.deleteMany({});

      await postCollection.deleteMany({});
      await userCollection.deleteMany({});
      await CommentModel.deleteMany({});
      await sessionCollection.deleteMany({});

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
}
