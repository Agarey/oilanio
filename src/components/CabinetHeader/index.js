import styles from './style.module.css'
import globals from "../../globals";
import {useRouter} from "next/router";

export default function CabinetHeader(props){
    const router = useRouter();

    let nextPaymentDate = props.courseInfo.next_payment_date;

    const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', dateOptions);
    const dateAsFormattedString = dateFormatter.format(new Date(nextPaymentDate));

    return(
            props.courseInfo !== null ? (
                <div className={styles.container}>
                    <div className={styles.logo_block}>
                        <a href="/">
                            <svg width="100" height="50" viewBox="0 0 93 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8241 45.414C13.4628 45.414 11.3161 44.8773 9.38409 43.804C7.48275 42.7307 5.98009 41.2127 4.87609 39.25C3.80275 37.2567 3.26609 34.9567 3.26609 32.35C3.26609 29.774 3.81809 27.5047 4.92209 25.542C6.05675 23.5487 7.59009 22.0307 9.52209 20.988C11.4541 19.9147 13.6161 19.378 16.0081 19.378C18.4001 19.378 20.5621 19.9147 22.4941 20.988C24.4261 22.0307 25.9441 23.5333 27.0481 25.496C28.1828 27.4587 28.7501 29.7433 28.7501 32.35C28.7501 34.9567 28.1674 37.2567 27.0021 39.25C25.8674 41.2127 24.3188 42.7307 22.3561 43.804C20.3934 44.8773 18.2161 45.414 15.8241 45.414ZM15.8241 41.734C17.3268 41.734 18.7374 41.3813 20.0561 40.676C21.3748 39.9707 22.4328 38.9127 23.2301 37.502C24.0581 36.0913 24.4721 34.374 24.4721 32.35C24.4721 30.326 24.0734 28.6087 23.2761 27.198C22.4788 25.7873 21.4361 24.7447 20.1481 24.07C18.8601 23.3647 17.4648 23.012 15.9621 23.012C14.4288 23.012 13.0181 23.3647 11.7301 24.07C10.4728 24.7447 9.46075 25.7873 8.69409 27.198C7.92742 28.6087 7.54409 30.326 7.54409 32.35C7.54409 34.4047 7.91209 36.1373 8.64809 37.548C9.41475 38.9587 10.4268 40.0167 11.6841 40.722C12.9414 41.3967 14.3214 41.734 15.8241 41.734Z" fill={'#412FAE'}/>
                                <path d="M36.0151 9.96V44H30.7711V9.96H36.0151ZM37.932 31.212C37.932 28.6667 38.4534 26.4127 39.496 24.45C40.5694 22.4873 42.0107 20.9693 43.82 19.896C45.66 18.792 47.684 18.24 49.892 18.24C51.8854 18.24 53.618 18.6387 55.09 19.436C56.5927 20.2027 57.7887 21.1687 58.678 22.334V18.654H63.968V44H58.678V40.228C57.7887 41.424 56.5774 42.4207 55.044 43.218C53.5107 44.0153 51.7627 44.414 49.8 44.414C47.6227 44.414 45.6294 43.862 43.82 42.758C42.0107 41.6233 40.5694 40.0593 39.496 38.066C38.4534 36.042 37.932 33.7573 37.932 31.212ZM58.678 31.304C58.678 29.556 58.31 28.038 57.574 26.75C56.8687 25.462 55.9334 24.4807 54.768 23.806C53.6027 23.1313 52.3454 22.794 50.996 22.794C49.6467 22.794 48.3894 23.1313 47.224 23.806C46.0587 24.45 45.108 25.416 44.372 26.704C43.6667 27.9613 43.314 29.464 43.314 31.212C43.314 32.96 43.6667 34.4933 44.372 35.812C45.108 37.1307 46.0587 38.1427 47.224 38.848C48.42 39.5227 49.6774 39.86 50.996 39.86C52.3454 39.86 53.6027 39.5227 54.768 38.848C55.9334 38.1733 56.8687 37.192 57.574 35.904C58.31 34.5853 58.678 33.052 58.678 31.304ZM79.0438 18.24C81.0372 18.24 82.8158 18.654 84.3798 19.482C85.9745 20.31 87.2165 21.5367 88.1058 23.162C88.9952 24.7873 89.4398 26.75 89.4398 29.05V44H84.2418V29.832C84.2418 27.5627 83.6745 25.83 82.5398 24.634C81.4052 23.4073 79.8565 22.794 77.8938 22.794C75.9312 22.794 74.3672 23.4073 73.2018 24.634C72.0672 25.83 71.4998 27.5627 71.4998 29.832V44H66.2558V18.654H71.4998V21.552C72.3585 20.5093 73.4472 19.6967 74.7658 19.114C76.1152 18.5313 77.5412 18.24 79.0438 18.24Z" fill={'#412FAE'}/>
                                <rect x="15" y="20" width="2" height="12" fill={'#412FAE'}/>
                                <circle cx="16" cy="12" r="2" fill={'#412FAE'}/>
                            </svg>
                        </a>
                    </div>
                    <div className={styles.center_block}>
                        <p className={styles.info_text}>
                            Подписка до: <strong>{dateAsFormattedString}</strong>
                        </p>
                    </div>
                    <div className={styles.account_block}>
                        <div className={styles.account_block_inner}>
                            <div className={styles.logo}>
                                <img
                                    src={props.courseInfo.img_src}
                                    className={styles.center_logo}
                                    width={'100%'}
                                />
                            </div>
                            <div className={styles.text}>
                                <p className={styles.center_name}>{props.courseInfo.title}</p>
                                <p
                                    className={styles.logout_button}
                                    onClick={() => {
                                        localStorage.removeItem(globals.localStorageKeys.authToken);
                                        localStorage.removeItem(globals.localStorageKeys.centerId);
                                        localStorage.removeItem(globals.localStorageKeys.roleId);
                                        localStorage.removeItem(globals.localStorageKeys.currentUserId);

                                        router.push("/login");
                                    }}
                                >Выйти</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
    );
}
