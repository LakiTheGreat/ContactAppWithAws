import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
interface Props {
  imageUrl: string;
  size: number;
  initials: string;
}

const AvatarWithSkeleton = ({ imageUrl, size = 100, initials }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {!imageLoaded && (
        <Skeleton variant="circular" width={size} height={size} />
      )}

      {/* Avatar image */}
      <Avatar
        src={imageUrl}
        alt="Avatar"
        className="avatar"
        style={{ opacity: imageLoaded ? 1 : 0 }} // Hide the avatar until loaded
        onLoad={handleImageLoad}
        {...(initials && { children: initials })}
      />
    </div>
  );
};

export default AvatarWithSkeleton;
