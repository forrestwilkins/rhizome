import DarkMode from '@/components/shared/icons/dark-mode';
import { useIsDarkMode } from '@/hooks/shared.hooks';
import { sleep } from '@/utils/shared.utils';
import { LightModeOutlined } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  PaletteMode,
  SxProps,
  useColorScheme,
} from '@mui/material';
import { MouseEvent, useState } from 'react';

type Mode = PaletteMode | 'system';

interface Props {
  sx?: SxProps;
}

export const ModeToggle = ({ sx }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { setMode } = useColorScheme();
  const isDarkMode = useIsDarkMode();

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSelect = async (mode: Mode) => {
    setAnchorEl(null);
    await sleep(100);
    setMode(mode);
  };

  const renderIcon = () => {
    if (isDarkMode) {
      return <DarkMode />;
    }
    return <LightModeOutlined />;
  };

  return (
    <Box sx={sx}>
      <IconButton onClick={handleBtnClick}>{renderIcon()}</IconButton>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleSelect('light')}>Light</MenuItem>
        <MenuItem onClick={() => handleSelect('dark')}>Dark</MenuItem>
        <MenuItem onClick={() => handleSelect('system')}>System</MenuItem>
      </Menu>
    </Box>
  );
};
