import React, { useState } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';

export default function HistoryButton({ movie, update, isDisabled = false }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const toggleHistory = () => {
    update({
        ...movie,
        history:
          movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
      },
    setStatus
    );
  };

  const isWatched = movie.history === HISTORY.WATCHED;
  const label = isWatched ? 'Remove from history' : 'Add to history';

  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={isWatched ? <MinusIcon /> : <AddIcon />}
        colorScheme='teal'
        variant={isWatched ? 'solid' : 'outline'}
        onClick={toggleHistory}
        disabled={isDisabled}
      />
    </Tooltip>
  );
}
