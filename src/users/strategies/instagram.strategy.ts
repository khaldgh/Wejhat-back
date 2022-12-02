// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Profile, Strategy } from "passport-instagram";

// @Injectable()
// export class InstagramStrategy extends PassportStrategy(Strategy, "instagram") {
//   constructor() {
//     super({
//       clientID: '630869138126008',
//       clientSecret: 'e962762d70dc3085b823737ce173439a',
//       callbackURL: "http://daleel-app.herokuapp.com/users/instagram",
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