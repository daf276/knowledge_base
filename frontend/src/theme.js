import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      title: '#222222',
      description: '#444444',
      verylight: '#eeeeff',
      light: '#757ce8',
      main: '#3f5075',
      dark: '#002884',
      lightgray: '#eee',
      contrastText: '#fff',
    },
    error : {
      main: '#ba000d',
    }
  },
});

export default theme;