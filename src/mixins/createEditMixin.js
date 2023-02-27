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
                val => !!(val && val.trim()) || this.$t('dialogs.createAndEdit.errors.nameRequired'),
                val => val?.length <= 40 || this.$t('dialogs.createAndEdit.errors.longName')
            ],
            phoneRules: [
                val => !!(val && val.trim()) || this.$t('dialogs.createAndEdit.errors.phoneRequired'),
                val =>
                    /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(val) ||
                    this.$t('dialogs.createAndEdit.errors.invalidPhone')
            ],
            emailRules: [
                val =>
                    !(val && val.trim()) || /.+@.+\..+/.test(val) || this.$t('dialogs.createAndEdit.errors.invalidMail')
            ],
            birthdayRules: [
                val =>
                    val !== null ||
                    !isNaN(new Date(val).getTime()) ||
                    this.$t('dialogs.createAndEdit.errors.invalidDate'),
                val => {
                    const enteredDate = new Date(val);
                    const nowDate = new Date(new Date().toISOString().slice(0, 10));
                    const tooYoung = enteredDate.getTime() > nowDate.getTime();

                    return !tooYoung || this.$t('dialogs.createAndEdit.errors.earlyDate');
                },
                val => {
                    const enteredDate = new Date(val);
                    const tooOld = enteredDate.getFullYear() < 1900;

                    return !tooOld || this.$t('dialogs.createAndEdit.errors.lateDate');
                }
            ]
        };
    }
};
