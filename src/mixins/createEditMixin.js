export default {
    data() {
        return {
            // input data
            userName: '',
            userPhone: '',
            userMail: '',
            userBirthday: null,

            // input rules
            nameRules: [
                val => !!(val && val.trim()) || 'Name is required.',
                val => val?.length <= 40 || 'Name must be less than 40 characters.'
            ],
            phoneRules: [
                val => !!(val && val.trim()) || 'Phone number is required.',
                val => /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(val) || 'Phone must be valid.'
            ],
            emailRules: [val => !(val && val.trim()) || /.+@.+\..+/.test(val) || 'E-mail must be valid.'],
            birthdayRules: [
                val => val !== null || !isNaN(new Date(val).getTime()) || 'Date must be valid',
                val => {
                    const enteredDate = new Date(val);
                    const nowDate = new Date(new Date().toISOString().slice(0, 10));
                    const tooYoung = enteredDate.getTime() > nowDate.getTime();

                    return !tooYoung || 'The site rules prohibit saving users from the future :)';
                },
                val => {
                    const enteredDate = new Date(val);
                    const tooOld = enteredDate.getFullYear() < 1900;

                    return (
                        !tooOld ||
                        'We doubt that you will be able to reach such an old contact. Please, try someone younger :)'
                    );
                }
            ]
        };
    }
};
