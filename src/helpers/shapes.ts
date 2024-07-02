export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  public change(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getCopy() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  public static isIntersectingBoundary(rect1: Rectangle, rect2: Rectangle) {
    const rect1x1 = rect1.x;
    const rect1y1 = rect1.y;
    const rect1x2 = rect1.x + rect1.width;
    const rect1y2 = rect1.y + rect1.height;

    const rect2x1 = rect2.x;
    const rect2y1 = rect2.y;
    const rect2x2 = rect2.x + rect2.width;
    const rect2y2 = rect2.y + rect2.height;

    const x5 = Math.max(rect1x1, rect2x1);
    const y5 = Math.max(rect1y1, rect2y1);

    const x6 = Math.min(rect1x2, rect2x2);
    const y6 = Math.min(rect1y2, rect2y2);

    if (x5 > x6 || y5 > y6) {
      return false;
    }

    return true;
  }
}

export class RectangleBoundary extends Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public side: "top" | "bottom" | "left" | "right"
  ) {
    super(x, y, width, height);
  }

  
  public isIntersecting(rect: Rectangle) {
    const rect1x1 = rect.x;
    const rect1y1 = rect.y;
    const rect1x2 = rect.x + rect.width;
    const rect1y2 = rect.y + rect.height;

    const rect2x1 = this.x;
    const rect2y1 = this.y;
    const rect2x2 = this.x + this.width;
    const rect2y2 = this.y + this.height;

    const x5 = Math.max(rect1x1, rect2x1);
    const y5 = Math.max(rect1y1, rect2y1);

    const x6 = Math.min(rect1x2, rect2x2);
    const y6 = Math.min(rect1y2, rect2y2);

    if (x5 > x6 || y5 > y6) {
      return false;
    }

    return this.side;
  }
}

export class Vector {
  constructor(public x: number, public y: number) {}

  public getCopy() {
    return new Vector(this.x, this.y);
  }

  public change(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
