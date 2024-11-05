import { IAlbumData } from "./IAlbumData";
import { IUserPlaylists } from "./IUserPlaylist";
import { IVideoList } from "./IVideoList";

export interface IUserMedia {
  albums:IAlbumData[];
  videos:IVideoList[];
  playlists:IUserPlaylists[]
}