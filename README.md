
# login-attack-demo

## Description
This is a demo script which compares the effects of error messages on the security
of a login process from attacks.

## Example
```sh
> node index.js

Random user generated: { username: 'engineer', password: 'spring' }
Time to crack (smart): 16ms
Time to crack (naive): 0ms
TRIES (smart): 715679
TRIES (naive): 1083
```

## Components

### Dictionary
Dictionary is a collection of 1575 most commonly used passwords based on
[danielmiessler/SecLists][dictionary-source].

### Naive server
A server which gives out specific error messages based on the failing stage of
the login process. Like if the password is invalid, it'd say "Invalid password".

### Smart server
A server which gives out vague error messages on failure of the login process.
Like if the password is invalid and not the username, it'd still say
"Invalid username/password".

### Attacker
A client which uses the dictionary to generate a pair of username and password,
and uses them to break into the system. It also analyzes the error messages as:

* An error message saying the pssword was invalid, indicates the username was
    correct
* An error message saying the username was invalid, indicates, no combination of
    password will result in a successful login.
* An inconclusive error message is ignored and the next combination is tried.

## License
MIT

[dictionary-source]: https://github.com/danielmiessler/SecLists/blob/master/Passwords/probable-v2-top1575.txt