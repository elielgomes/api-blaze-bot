import { v4 as uuidv4 } from "uuid";
import { RefreshToken } from "@prisma/client";

export class RefreshTokenEntity implements RefreshToken {

  public readonly id: string;

  public expiresIn: number;
  public userId: string;

  constructor(props: Omit<RefreshToken, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidv4();
    }
  }
}