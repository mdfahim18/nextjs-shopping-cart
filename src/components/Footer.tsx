import { footerLinks } from '@/constant';

const Footer = () => {
  return (
    <footer className='flex flex-col justify-center items-center gap-5 bg-purple-900 max-w-7xl mx-auto padding-x py-5'>
      <ul className='flex justify-between gap-4 items-center'>
        {footerLinks.map((item, index) => (
          <li
            key={item.id}
            className={`text-gray-100 text-sm ${
              index === footerLinks.length - 1 ? '' : 'capitalize'
            }`}
          >
            {item.title}
            <div></div>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
