import { ALargeSmall, ArrowDownAZ, ArrowDownZA, ChartNoAxesColumnDecreasing, ChartNoAxesColumnIncreasing, ChevronDown, ChevronUp, CircleQuestionMark, Delete, Eye, EyeOff, Filter, Grid2X2, Grid2X2Plus, HeartPlus, History, HouseHeart, HousePlus, Lock, LogIn, LucideProps, Mail, MailPlus, MapPin, MapPinPlus, Menu, MessageSquareText, NotepadText, Package, PackagePlus, Phone, RectangleEllipsis, RulerDimensionLine, Search, ShelvingUnit, ShieldCheck, ShieldEllipsis, ShieldX, SquarePen, Tag, Upload, User, UserRoundPlus, X } from "lucide-react";

const icons = { ALargeSmall, ArrowDownAZ, ArrowDownZA, ChartNoAxesColumnDecreasing, ChartNoAxesColumnIncreasing, ChevronDown, ChevronUp, CircleQuestionMark, Delete, Eye, EyeOff, Filter, Grid2X2, Grid2X2Plus, HeartPlus, History, HouseHeart, HousePlus, Lock, LogIn, Mail, MailPlus, MapPin, MapPinPlus, Menu, MessageSquareText, NotepadText, Package, PackagePlus, Phone, RectangleEllipsis, RulerDimensionLine, Search, ShelvingUnit, ShieldCheck, ShieldEllipsis, ShieldX, SquarePen, Tag, Upload, User, UserRoundPlus, X };

type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, "name"> {
  name?: IconName | null;
}

export default function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  ...props
}: IconProps) {
  // 1. Se o nome não foi passado, for nulo ou não existir no mapeamento, previne o erro retornando null
  if (!name || !icons[name]) {
    return null;
  }

  const LucideIcon = icons[name];

  // 2. Só renderiza se for um componente válido
  return <LucideIcon size={size} strokeWidth={strokeWidth} {...props} />;
}
