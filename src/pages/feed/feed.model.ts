export class FeedPostModel {
	title: string;
	image: string;
	description: string;
	likes: number = 0;
	comments: number = 0;
	liked: boolean = false;
}

export class FeedModel {
  category: any;
  posts: Array<FeedPostModel>;
}
