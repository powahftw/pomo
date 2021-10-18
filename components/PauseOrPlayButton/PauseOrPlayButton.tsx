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
    />
  );
}
