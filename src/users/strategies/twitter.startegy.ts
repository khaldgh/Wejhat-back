// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Profile, Strategy } from "passport-twitter";

// @Injectable()
// export class TwitterStrategy extends PassportStrategy(Strategy, "twitter") {
//   constructor() {
//     // zPhYhU8AccxlQU14fqu8BuAk1 //API KEY
//     // J1bRMpPbNizIAHJ1JnAPeDFDgyXxB6JlLfljKBEvy45rug0gTA //API KEY SECRET
//     // AAAAAAAAAAAAAAAAAAAAACwCYQEAAAAAVIPW1uAA91QzT%2FPz5cKo8NiQvwc%3DYdZlgtoUj7rh5Uco4NuC6a3UHzC9gco7LbKnzwe9Rmq79CIW4t //BEARER TOKEN
//     super({
//       consumerKey: 'NGhjeExvMzViSExZQlB3SUhqZXQ6MTpjaQ',
//       consumerSecret: 'VhsxafrakKoUg3bKucpHXwKFgVOeQu8IoswPddjryoPmKUzRgl',
//       callbackURL: "http://daleel-app.herokuapp.com/users/twitter/callback",
//       scope: "email",
//       profileFields: ["emails", "name"],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: (err: any, user: any, info?: any) => void
//   ): Promise<any> {
//     const { name, emails } = profile;
//     const user = {
//       email: emails[0].value,
//       firstName: name.givenName,
//       lastName: name.familyName,
//     };
//     const payload = {
//       user,
//       accessToken,
//     };

//     done(null, payload);
//   }
// }