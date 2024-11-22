import { IAlbumData } from "./IAlbumData"
import { IUserData } from "./IUserData"
import { IUserPlaylists } from "./IUserPlaylist"
import { IVideoList } from "./IVideoList"

export interface IHomePageData {
  albums:IAlbumData[]
  artists:IUserData[]
  videos:IVideoList[]
  playlists:IUserPlaylists[]
}