version development

# Make sure we don't generate spurious UnusedDeclaration or ShellCheck warnings for declarations
# that are intentionally used only as environment variables in the task command.

task t {
    input {
        String s1
        String s2
        String s3
        String s4
    }

    command <<<
        echo "Hello $s2$s3"
        $s4>>>

    output {
        File message = stdout()
    }
}
