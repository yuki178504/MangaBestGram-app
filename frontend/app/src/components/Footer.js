import { Link } from 'react-router-dom';
import footer from '../css/footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={footer["container"]}>
        <ul className={footer["container-ul"]}>
          <li>
            <Link to="/terms-of-service" className={footer["container-list"]}>利用規約</Link>
          </li>
          <li>
            <Link to="/privacy-policy" className={footer["container-list"]}>プライバシーポリシー</Link>
          </li>
        </ul>
        <p className={footer["copylight"]}>Copyright © 2022. YUKI</p>
      </div>
    </footer>
  );
};

export default Footer;
