import React from 'react';
import { Icon, PauseCircle, PlayCircle, RefreshCcw } from 'react-feather';
import PillButton from '../PillButton';

export default function PauseOrPlayButton({
  isPlaying,
  isTimeOver,
  wasActiveBefore,
  onPlayAction,
  onPauseAction,
  onRestartAction,
}) {
  let text: string, IconToUse: Icon, action: () => void;
  if (isPlaying) {
    [text, IconToUse, action] = ['Pause', PauseCircle, onPauseAction];
  } else if (!isTimeOver) {
    [text, IconToUse, action] = [
      wasActiveBefore ? 'Resume' : 'Start',
      PlayCircle,
      onPlayAction,
    ];
  } else {
    [text, IconToUse, action] = ['Restart', RefreshCcw, onRestartAction];
  }

  return (
    <PillButton
      text={text}
      onClickAction={action}
      icon={<IconToUse strokeWidth={1.5} size={24} />}
      className="w-40"
    />
  );
}
