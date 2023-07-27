import React, { useState, useEffect, useCallback } from 'react';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import { ProfilePopup } from './ProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { AvatarPopup } from './AvatarPopup';
import { ConfirmPopup } from './ConfirmPopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function App(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deleteCard, setDeleteCard] = useState('');

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleConfirmPopupClick(cardId) {
        setDeleteCard(cardId);
        setConfirmPopupOpen(true);
    }

    const closeAllPopups = useCallback(() => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setConfirmPopupOpen(false);
        setSelectedCard({});
    }, []);

    useEffect(() => {
        Promise.all([api.getUser(), api.getCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((error) => {
                console.log(
                    `Ошибка получения данных пользователя и карт - ${error}`
                );
            });
    }, []);

    function handleUpdateUser({ name, about }) {
        api.updateProfileInfo(name, about)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка редактирования профиля - ${error}`);
            });
    }

    function handleDeleteCardSubmit(e) {
        api.deleteCard(deleteCard)
            .then(() => {
                setCards((cards) =>
                    cards.filter((card) => {
                        return card._id !== deleteCard;
                    })
                );
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка удаления карточки - ${error}`);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        api.updateAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка загрузки нового аватара - ${error}`);
            });
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard(name, link)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка добавления карточки - ${error}`);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((error) => {
                    console.log(`Ошибка удаления лайка - ${error}`);
                });
        } else {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((error) => {
                    console.log(`Ошибка добавления лайка - ${error}`);
                });
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Main
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardClick={handleCardClick}
                                    onDeleteCardClick={handleConfirmPopupClick}
                                />
                            }
                        />
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/sign-up" element={<Register />} />
                    </Routes>
                </div>
                <ProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCards={handleAddPlaceSubmit}
                />
                <AvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                />
                <ConfirmPopup
                    onClose={closeAllPopups}
                    isOpen={confirmPopupOpen}
                    onSubmit={handleDeleteCardSubmit}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
