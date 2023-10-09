import React from "react";

import { ReactComponent as Bookmark } from "./icons/Favorite.svg";
import { ReactComponent as More } from "./icons/more.svg";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import { ReactComponent as Minus } from "./icons/Minus.svg";
import { ReactComponent as ArrowLeft } from "./icons/ArrowUp.svg";
import { ReactComponent as ArrowRight } from "./icons/ArrowUpOne.svg";
import { ReactComponent as Search } from "./icons/Search.svg";
import { ReactComponent as Cart } from "./icons/Cart.svg";
import { ReactComponent as Twitter } from "./icons/Twitter.svg";
import { ReactComponent as Facebook } from "./icons/Facebook.svg";
import { ReactComponent as User } from "./icons/User.svg";

const icons = {
  bookmark: Bookmark,
  more: More,
  plus: Plus,
  minus: Minus,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  search: Search,
  cart: Cart,
  twitter: Twitter,
  facebook: Facebook,
  user: User,
};

export type IconType = keyof typeof icons; // bookmark | more | plus | minus | arrowLeft|  arrowRight | search | cart | twitter |facebook| user
// export type IconType = "bookmark" | "more" | 'plus' | 'minus' | 'arrowLeft'|  'arrowRight' | 'search' | 'cart' |' twitter' |'facebook'| 'user';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

const Icon: React.FC<IconProps> = ({ type, ...props }) => {
  // if (type === "more") {
  //   return <More />;
  // }
  // if (type === "bookmark") {
  //   return <Bookmark />;
  // }

  const Element = icons[type];
  return <Element {...props} />;
};

export default Icon;
