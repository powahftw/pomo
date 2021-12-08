import { PauseCircle, PlayCircle } from 'react-feather';
import PillButton from '../PillButton';

export default function PauseOrPlayButton({
  isPlaying,
  wasActiveBefore,
  onPlayAction,
  onPauseAction,
}) {
  const playingButtonText = wasActiveBefore ? 'Resume' : 'Start';
  const textToUse = isPlaying ? 'Pause' : playingButtonText;
  return (
    <PillButton
      text={textToUse}
      onClickAction={isPlaying ? onPauseAction : onPlayAction}
      icon={
        isPlaying
          ? <PauseCircle strokeWidth={1.5} size={24} />
          : <PlayCircle strokeWidth={1.5} size={24} />
        }
    />
  );
}
